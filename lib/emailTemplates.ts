export const forgotPasswordTemplate = (resetLink: string) => {
  return `
    <div style="max-width: 600px; margin: 40px auto; background: #ffffff; padding: 32px; border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
      <h1 style="font-size: 24px; font-weight: bold; margin-bottom: 16px; color: #000000;">Reset je wachtwoord</h1>
      <p style="font-size: 16px; margin-bottom: 24px; color: #111827;">
        We hebben een verzoek ontvangen om je wachtwoord te resetten. Klik op de knop hieronder om een nieuw wachtwoord te kiezen:
      </p>
      <a href="${resetLink}" style="display: inline-block; background-color: #000000; color: #ffffff; padding: 12px 24px; border-radius: 12px; text-decoration: none; font-size: 16px; font-weight: 500;">
        Reset wachtwoord
      </a>
      <p style="font-size: 14px; color: #6b7280; margin-top: 32px;">
        Als je geen wachtwoord reset hebt aangevraagd, kun je deze e-mail negeren.
      </p>
    </div>
`;
};
