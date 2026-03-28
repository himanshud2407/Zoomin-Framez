# Zoomin Framez - Deployment & Integration Guide

This guide covers how to set up **Resend** for email notifications and **Supabase** for data persistence, followed by deployment to platforms like Vercel or Netlify.

## 1. Supabase Setup (Database)

1.  **Create a Account**: Sign up at [supabase.com](https://supabase.com/).
2.  **New Project**: Create a new project and name it `Zoomin Framez`.
3.  **Database Table**: Go to the **SQL Editor** in the Supabase dashboard and run the following script to create the `contact_submissions` table:

    ```sql
    create table contact_submissions (
      id uuid default gen_random_uuid() primary key,
      name text not null,
      email text not null,
      message text not null,
      created_at timestamp with time zone default timezone('utc'::text, now()) not null
    );

    -- Enable Row Level Security (optional but recommended)
    alter table contact_submissions enable row level security;

    -- Allow anyone to insert (for contact form)
    create policy "Allow public insert" on contact_submissions for insert with check (true);
    ```

4.  **API Keys**: Go to **Project Settings > API** and copy your:
    *   `Project URL`
    *   `anon public` API Key

## 2. Resend Setup (Email Service)

1.  **Create Account**: Sign up at [resend.com](https://resend.com/).
2.  **API Key**: Go to **API Keys** and create a new key. Copy it.
3.  **Domain (Optional but Recommended)**: By default, you can send to your own email using `onboarding@resend.dev`. For production, verify your domain in the **Domains** section.

## 3. Environment Variables

Create a `.env.local` file in your project root (or update your deployment platform's environment variables) with the following:

```env
# Resend
RESEND_API_KEY=your_resend_api_key

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Notification
CONTACT_EMAIL=the_email_you_want_to_receive_messages_at
```

## 4. Deployment

### Deploying to Vercel (Recommended)

1.  Push your code to a GitHub/GitLab/Bitbucket repository.
2.  Import your project into [Vercel](https://vercel.com/).
3.  Add the environment variables listed above in the **Environment Variables** section of the Vercel deployment setup.
4.  Click **Deploy**.

## 5. Local Testing

To test the integration locally:
1.  Run `npm install`.
2.  Ensure `.env.local` is correctly populated.
3.  Run `npm run dev`.
4.  Open the contact modal, fill out the form, and click "Send".
5.  Check your Supabase "Table Editor" and your email inbox.
