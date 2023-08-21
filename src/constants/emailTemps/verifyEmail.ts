export function verifyEmail(name: string, backendLink: any, token: any): string {
    return `
    <!DOCTYPE html>
    <html>
    
    <head>
        <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600&display=swap" rel="stylesheet">
    </head>
    
    <body style="font-family: 'Lexend', sans-serif;">
        <table role="presentation" cellspacing="0" cellpadding="0" width="100%">
            <tr>
                <td style="background: #FFF;">
                    <table role="presentation" cellspacing="0" cellpadding="0" width="640" align="center">
                        <tr>
                            <td style="padding: 0; text-align: center;">
                                <!-- Linkcollect logo -->
                                <img src="https://i.ibb.co/vVqNfKV/logo.png" alt="linkcollect logo"
                                    style="display: block; margin: 0 auto;">
                            </td>
                        </tr>
                        <tr>
                            <td style="background: #FFF; text-align: center;">
    
                                <!-- verification content -->
                                <h1 style="color: #000; font-size: 20px; font-weight: 600; margin-bottom: 18px;">Hey
                                    ${name},
                                    future
                                    Bookmarking Superstar!</h1>
                                <p
                                    style="color: #000; text-align: justify; font-size: 12px; font-weight: 500; line-height: 1.5; margin: 20px 0;">
                                    Congratulations on taking the first step towards organized bookmarking bliss with
                                    LinkCollect! We're thrilled to have you on board. To get you rolling with the
                                    bookmarking magic, click on the verification button below.</p>
    
                                <!-- email icon line -->
                                <div style="width: 100%; display: flex; justify-content: center; margin: 30px 0;">
                                    <div class="emailIcon"
                                        style="display: flex; align-self: center; gap: 23.04px; margin: 0 auto;">
                                        <hr style="width: 146.176px; height: 0.256px;">
                                        <!-- icon -->
                                        <img src="https://i.ibb.co/VS99Qfh/email-Icon.png" alt=""
                                            style="width: 16.64px; height: 13.312px; margin: 0 25px;">
                                        <hr style="width: 146.176px; height: 0.256px;">
                                    </div>
                                </div>
    
                                <!-- verify email link -->
                                <a href="${backendLink}/api/v1/user/verify-email?token=${token}" target='_blank'
                                    style="border-radius: 3.84px; background: #6166F1;font-family: 'Poppins', sans-serif; display: flex; padding: 12.544px 0; width: 243px; text-decoration:none ; margin: 0 auto; justify-content: center; align-items: center; gap: 2.56px; color: #FFF; text-align: center; font-size: 16.384px; font-style: normal; font-weight: 600; line-height: normal;">
                                    <span style="margin: 0 auto ;"> Verify
                                        Email</span>
                                </a>
    
    
                            </td>
                        </tr>
                        <tr>
                            <td style="background: #FFF; text-align: center; padding: 20px 0;">
                                <!-- verify-magic -->
                                <p style="color: #000; font-size: 12px; font-weight: 500; text-align: center;">But hey, if
                                    technology decides to play hide and seek with your email, don't worry! We've got a
                                    secret spell to help you out. Just copy-paste this enchanted incantation into your
                                    browser's address bar:</p>
                                <a href="${backendLink}/api/v1/user/verify-email?token=${token}"
                                    style="color: #6166F1; font-size: 12px; font-weight: 500; text-decoration: underline;">${backendLink}/api/v1/user/verify-email?token=${token}</a>
                            </td>
                        </tr>
                        <tr>
                            <td style="background: #FFF; text-align: center; padding: 20px 0; display: flex;">
                                <!-- sign-off message -->
                                <p
                                    style="color: #000; font-size: 12px; font-weight: 500; text-align: left; white-space: nowrap; line-height: normal; align-self: center;">
                                    Stay magical and bookmark-tastic!<br />Cheers,<br />The LinkCollect Team
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <td style="background: #6166F1; text-align: center; padding: 20px;">
    
                                <!-- icons -->
    
                                <div style="display: flex; justify-content: center;">
                                    <div
                                        style="display: flex; justify-content: center; margin: 25px auto; align-self: center;">
                                        <a href="https://twitter.com/linkcollect_io" style="margin-right: 10px;"><img
                                                src="https://i.ibb.co/FKnCFRV/twitter.png" alt="twitter" width="26"
                                                height="26" style="display: block;"></a>
                                        <a href="#" style="margin-right: 10px;"><img
                                                src="https://i.ibb.co/2kPqfrT/instagram.png" alt="instagram" width="26"
                                                height="26" style="display: block;"></a>
                                        <a href="#" style="margin-right: 10px;"><img
                                                src="https://i.ibb.co/K6X2PYH/medium-icon.png" alt="medium" width="26"
                                                height="26" style="display: block;"></a>
                                        <a href="#"><img src="https://i.ibb.co/ZNbGhBK/discord.png" title='discord'
                                                width="26" height="26" style="display: block;" /></a>
                                    </div>
                                </div>
                                <!-- footer -->
                                <div style="color: #FFF; font-size: 12px; font-weight: 500; line-height: 1.5;">
                                    <p style="margin: 0;">2023 @linkcollect.io</p>
                                    <p style="margin: 0; text-decoration: underline; cursor: pointer;">Unsubscribe</p>
                                </div>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
    
    </html>
    
    `;
}
