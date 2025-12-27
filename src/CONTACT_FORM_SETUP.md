# Contact Form Setup Guide

The contact form is now functional and will send emails based on the selected department. Follow these steps to complete the setup:

## 1. Choose an Email Service

The form currently supports **Resend** (recommended for Next.js), but you can easily switch to other services.

### Option A: Resend (Recommended)

1. Sign up at [resend.com](https://resend.com)
2. Get your API key from the dashboard
3. Verify your domain or use the test domain

### Option B: Other Email Services

You can modify `frontend/app/api/contact/route.ts` to use:
- Nodemailer (SMTP)
- SendGrid
- Mailgun
- AWS SES
- etc.

## 2. Environment Variables

Add these to your `.env.local` file:

```env
# Resend Configuration (if using Resend)
RESEND_API_KEY=re_xxxxxxxxxxxxx
FROM_EMAIL=noreply@yourdomain.com

# Department Email Addresses
GENERAL_HR_EMAIL=hr@yourdomain.com
RECRUITMENT_EMAIL=recruitment@yourdomain.com
PAYROLL_EMAIL=payroll@yourdomain.com

# Fallback email (if department doesn't match)
CONTACT_EMAIL=contact@yourdomain.com
```

## 3. Install Resend (if using Resend)

```bash
cd frontend
npm install resend
```

## 4. How It Works

- When a user selects "General HR" → Email goes to `GENERAL_HR_EMAIL`
- When a user selects "Recruitment" → Email goes to `RECRUITMENT_EMAIL`
- When a user selects "Payroll" → Email goes to `PAYROLL_EMAIL`

The email includes:
- Department selected
- Sender's name
- Sender's email (as reply-to)
- Message content

## 5. Testing

1. Fill out the form on `/contact`
2. Select a department
3. Submit the form
4. Check the recipient email inbox

## 6. Features

✅ Form validation
✅ Loading state during submission
✅ Success/error messages
✅ Form reset after successful submission
✅ Department-based email routing
✅ HTML email formatting
✅ Reply-to set to sender's email

## Troubleshooting

- **Emails not sending**: Check your API key and environment variables
- **CORS errors**: Ensure your API route is accessible
- **Form not submitting**: Check browser console for errors

