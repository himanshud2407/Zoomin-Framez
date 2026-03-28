"use server";

import { resend } from "@/lib/resend";
import { supabase } from "@/lib/supabase";

export async function submitContactForm(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !message) {
    return { error: "Please fill in all fields." };
  }

  try {
    // 1. Store the message in Supabase
    // Make sure your table is called 'messages' or 'contacts' with appropriate columns
    const { error: supabaseError } = await supabase
      .from('contact_submissions')
      .insert([
        { 
          name, 
          email, 
          message,
          created_at: new Date().toISOString()
        }
      ]);

    if (supabaseError) {
      console.error("Supabase error:", supabaseError);
      // We still try to send the email even if DB insert fails
    }

    // 2. Send the email notification via Resend
    const { data, error: resendError } = await resend.emails.send({
      from: 'Zoomin Framez <onboarding@resend.dev>', // Update this with your verified domain
      to: process.env.CONTACT_EMAIL || 'your-email@example.com',
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <blockquote style="padding: 1rem; background: #f5f5f5; border-left: 4px solid #ccc;">
          ${message}
        </blockquote>
      `,
    });

    if (resendError) {
      console.error("Resend error:", resendError);
      return { error: "Failed to send email. Please try again later." };
    }

    return { success: true };
  } catch (error) {
    console.error("Submission error:", error);
    return { error: "Something went wrong. Please try again later." };
  }
}
