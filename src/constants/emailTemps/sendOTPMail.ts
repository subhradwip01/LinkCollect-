export function sendOTPMail(name: string, backendLink: any, token: any): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
      <style>
      body {
          font-family: Arial, sans-serif;
          background-color: #f1f1f1;
          text-align: center;
      }
      h2 {
          color: #333;
          font-size: 24px;
          margin-top: 20px;
      }
      h3 {
          color: #666;
          font-size: 18px;
          margin-top: 10px;
      }
      a {
          display: inline-block;
          margin-top: 20px;
          padding: 10px 20px;
          background-color: #00cc66; 
          color: #fff;

          text-decoration: none;
          border-radius: 5px;
          transition: background-color 0.3s ease;
      }
      a:hover {
          background-color: #93F593;
      }
      .verify-link {
          color: #fff;
      }
  </style>
      </head>
      <body>
          <h2> Hi 👋 ${name}</h2>
          <h3>Thanks for trying out LinkCollect. Please verify your email by clicking below </h3>
          <a href="${backendLink}/api/v1/user/verify-email?token=${token}" class="verify-link">Verify Email</a>
      </body>
      </html>
    `;
  }
  