export function verifyEmail(name: string, backendLink: any, token: any): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
      <style>
    @import url('https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600&display=swap');

    body {
        font-family: Lexend;
    }

    .container {
        background: #FFF;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        max-width: 640px;
        margin: 0 auto;
    }

    .head {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
    }

    .head img {
        width: 219.904px;
        height: 99.39px;
        flex-shrink: 0;
    }

    main {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 37.632px;
        max-width: 70%;
        margin: 0 auto;
    }

    main .verify-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 19.968px;
    }

    .message {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 14.848px;
    }

    .verify-email {
        display: flex;
        padding: 12.544px 86.016px;
        justify-content: center;
        align-items: center;
        gap: 2.56px;
        border-radius: 3.84px;
        background: #6166F1;
        color: #FFF;
        text-align: center;
        font-size: 16.384px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
        text-decoration: none;
    }

    .emailIcon {
        display: flex;
        align-items: center;
        gap: 23.04px;
    }

    .emailIcon img {
        width: 16.64px;
        height: 13.312px;
    }

    hr {
        width: 146.176px;
        height: 0.256px;
    }

    h1 {
        color: #000;
        font-size: 19.456px;
        font-weight: 600;
        line-height: normal;
        margin: 0;
    }

    h3 {
        color: #000;
        text-align: justify;
        font-family: Lexend;
        font-size: 12.288px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        margin: 0;
    }

    .verify-magic a {
        color: #6166F1;
        font-size: 12.288px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        text-decoration-line: underline;
    }

    .verify-magic {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 7.424px;
    }

    .sign-off {
        display: inline-flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
    }

    .sign-off img {
        width: 206.752px;
        height: 173.568px;
    }

    .sign-off h3 {
        text-align: left;
        white-space: nowrap;
    }

    footer {
        display: flex;
        width: 100%;
        height: 135.68px;
        padding: 19.536px 0px 6px 0px;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 2.56px;
        flex-shrink: 0;
        background: #6166F1;
    }

    .footer-links {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 23.552px;
        color: #FFF;
        text-align: center;
        font-family: Lexend;
        font-size: 12.288px;
        font-weight: 500;
        line-height: 16.22px;
    }

    .footer-links span {
        text-decoration: underline;
        cursor: pointer;
    }


    .footer-links .icons {
        display: flex;
        align-items: flex-start;
        gap: 21.947px;
    }

    .icons img,
    .icons svg {
        width: 25.6px;
        height: 25.6px;
    }

    .copyright{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 3.552px;
    }

</style>
      </head>
      <body>
      <div class="container">

          <!-- Linkcollect logo -->
          <div class="head">
              <img src='../assets/logo-linkcollect-svg.svg'
          </div>
  
          <!-- verification content -->
          <main class="content">
  
              <!-- verify email -->
              <section class="verify-container">
  
                  <div class="message">
  
                      <h1>Hey ${name}, future Bookmarking Superstar!</h1>
                      <h3>
                          Congratulations on taking the first step towards organised bookmarking bliss with LinkCollect!
                          We're
                          thrilled to have you on board.To get you rolling with the bookmarking magic, click on the
                          verification button below.
                      </h3>
  
                  </div>
  
                  <!-- email icon line -->
                  <div class="emailIcon">
  
                      <hr>
                      <!-- icon -->
                      <img src="../assets/mail-icon.svg" alt="">
                      <hr>
  
                  </div>
  
                  <!-- verify email link -->
                  <a href="${backendLink}/api/v1/user/verify-email?token=${token}" target='_blank' class="verify-email">Verify Email</a>
  
              </section>
  
              <!-- verify-magic  -->
              <section class="verify-magic">
                  <h3>
                      But hey, if technology decides to play hide and seek with your email, don't worry! We've got a
                      secret spell to help you out. Just copy-paste this enchanted incantation into your browser's address
                      bar:
                  </h3>
                  <a href="${backendLink}/api/v1/user/verify-email?token=${token}">
                     ${backendLink}/api/v1/user/verify-email?token=${token}
                  </a>
              </section>
  
              <!--  sign-off message -->
              <section class="sign-off">
                  <h3>
                      Stay magical and bookmark-tastic! <br />
                      Cheers, <br />
                      The LinkCollect Team
                  </h3>
                  <img src="https://i.ibb.co/gyBVskD/signOff.png" alt="signOff">
              </section>
  
              <!-- footer -->
              <footer>
                  <div class="footer-links">
  
                      <!-- icons -->
                      <div class="icons">
  
                          <!-- twitter -->
                          <a href="https://twitter.com/linkcollect_io">
                             <img src="../assets/twitter.svg" alt="signOff">
                          </a>
  
                          <!-- instagram -->
                          <a href="#">
                             <img src="../assets/instagram.svg" alt="signOff">
                          </a>
  
                          <!-- medium -->
                          <a href="#">
                             <img src="../assets/medium-icon.png" alt="signOff">
                          </a>
  
                          <!-- discord -->
                          <a href="#">
                             <img src="../assets/discord.svg" alt="signOff">
                          </a>
  
                      </div>
                      <div class="copyright">
                          2023 @linkcollect.io
  
                          <span>Unsubscribe</span>
                      </div>
  
                  </div>
              </footer>
  
          </main>
  
      </div>
  </body>

</html>
    `;
}
