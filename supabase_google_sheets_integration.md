# Connecting Supabase to Google Sheets (Webhook Integration)

This guide will help you connect your contact form to Google Sheets through Supabase using webhooks. This ensures that every time a new lead is submitted, it automatically appears in your client's Google Sheet.

## Step 1: Prepare Google Sheets

1. Create a new Google Sheet.
2. Name the columns in the first row: `Timestamp`, `Name`, `Email`, `Phone`, `Message`.
3. Go to **Extensions > Apps Script**.
4. Delete any existing code and paste the following:

```javascript
/**
 * @param {GoogleAppsScript.Events.DoPost} e
 */
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    // Supabase Webhook sends the record in 'record'
    var record = data.record || data; 

    var name = record.name || "N/A";
    var email = record.email || "N/A";
    var phone = record.phone || "N/A";
    var message = record.message || "N/A";
    var timestamp = record.created_at || new Date().toISOString();

    sheet.appendRow([timestamp, name, email, phone, message]);

    return ContentService.createTextOutput(JSON.stringify({ "result": "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (f) {
    return ContentService.createTextOutput(JSON.stringify({ "result": "error", "error": f.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

5. Click **Deploy > New Deployment**.
6. Select Type: **Web App**.
7. Set "Execute as": **Me**.
8. Set "Who has access": **Anyone**.
9. Click **Deploy** and **Authorize Access**.
10. **Copy the Web App URL** (you will need this for Supabase).

---

## Step 2: Setup Supabase Database Webhook

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard).
2. Go to **Database > Webhooks**.
3. Click **Create a new webhook**.
4. **Name**: `google_sheets_sync`.
5. **Table**: `contact_submissions`.
6. **Events**: Check `INSERT`.
7. **Webhook Configuration**:
   - **Method**: `POST`
   - **URL**: Paste your Google Web App URL from Step 1.
8. Click **Create Webhook**.

---

## Step 3: Ensure Supabase Table Exists

If you haven't created the `contact_submissions` table yet, run this in the **SQL Editor** in Supabase:

```sql
create table contact_submissions (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text,
  email text,
  phone text,
  message text
);
```

---

## Step 4: Verification

Now, when you fill out the contact form on your website:
1. The `actions.ts` script will save the data to Supabase.
2. Supabase will detect the new row and trigger the Webhook.
3. The Google Apps Script will receive the data and append it to your sheet.

> [!TIP]
> If you want to bypass Supabase Webhooks and call Google Sheets directly from your code for faster debugging, you can simply add a `fetch()` call to your Google Web App URL inside `src/app/actions.ts`.
