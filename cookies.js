const main = () => {
    const generateHtml = (html) => {
        const template = document.createElement("template");
        template.innerHTML = html.trim();
        return template.content.firstElementChild;
    }

    const createModal = generateHtml(`
    <div>
    <div class="cookies-overlay" style="
    position: fixed;
    top: 0;
    left: 0;
    background-color: black;
    opacity: .5;
    height: 100%;
    width: 100vw;
    z-index: 9999;
    display: none;"></div>
    <div class="cookies-modal" style="
    position: fixed;
    width: 800px;
    max-width: 80%;
    background-color: white;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0);
    z-index: 999999999;
    border-radius: 8px;
    transition: .3s;">
        <div class="cookies-head" style="
        background-color: darkgreen;
        font-size: 20px;
        color: white;
        font-weight: 400;
        padding: 12px;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;">
            Notice
        </div>
        <div class="cookies-body" style="
        padding: 12px;
        color:black;
        font-size: 16px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;">
            <div class="cookies-body-desc">We and selected third parties use cookies or similar technologies for
                technical purposes and, with your consent, for other purposes as specified in the cookie policy.
                Denying consent may make related features unavailable.
    
                Use the “Accept” button to consent to the use of such technologies. Use the “Reject” button or close
                this notice to continue without accepting.</div>
            <div class="cookies-body-btns" style="
            display: flex;
            justify-content: space-between;
            margin: 12px 0;">
                <div class="cookies-body-btns-customize">
                    <button class="cookies-body-btns-customize-button" style="
                    border: none;
                    padding: 10px;
                    border-radius: 18px;
                    background-color: lightgrey;
                    cursor: pointer;">Learn more and customize</button>
                </div>
                <div class="cookies-body-btns-choice">
                    <button class="cookies-body-btns-choice-button reject" style="
                    border: none;
                    padding: 10px;
                    border-radius: 18px;
                    background-color: darkgreen;
                    color: white;
                    margin:0 5px;
                    cursor: pointer;">Reject</button>
                    <button class="cookies-body-btns-choice-button accept" style="
                    border: none;
                    padding: 10px;
                    border-radius: 18px;
                    background-color: darkgreen;
                    color: white;
                    margin:0 5px;
                    cursor: pointer;">Accept</button>
                </div>
            </div>
        </div>
    </div>
    </div>
    `)


    document.body.appendChild(createModal)

    const cookies = () => {
        const cookiesModal = document.querySelector('.cookies-modal');
        const cookiesOverlay = document.querySelector('.cookies-overlay');
        const closeButton = document.querySelector('.modal-close');
        const acceptCookies = document.querySelector('.accept');
        const rejectCookies = document.querySelector('.reject');
        const customizeCookies = document.querySelector('.cookies-body-btns-customize-button');


        const resizeEvent = () => {
            if (document.body.getBoundingClientRect().width < 484) {
                document.querySelector('.cookies-body-btns').style.flexDirection = 'column';
                customizeCookies.style.width = '100%';
                acceptCookies.style.width = '50%';
                rejectCookies.style.width = '50%';
                document.querySelector('.cookies-body-btns-choice').style.display = 'flex'
                document.querySelector('.cookies-body-btns-choice').style.margin = '10px 0';
                // console.log('1');
            }
            else if (document.body.getBoundingClientRect().width > 484) {
                document.querySelector('.cookies-body-btns').style.flexDirection = 'row';
                customizeCookies.style.width = 'inherit';
                acceptCookies.style.width = 'inherit';
                rejectCookies.style.width = 'inherit';
                document.querySelector('.cookies-body-btns-choice').style.display = 'inherit'
                document.querySelector('.cookies-body-btns-choice').style.margin = '0';
                // console.log('2');
            }
        }

        resizeEvent()
        window.addEventListener('resize', resizeEvent)

        let cookiesStatus = false
        if (cookiesStatus == false) {
            const cookiesShow = () => {
                setTimeout(() => {
                    cookiesModal.style.transform = 'translate(-50%, -50%) scale(1)'
                    cookiesOverlay.style.display = 'block'
                    document.querySelector('html').style.overflowY = 'hidden';
                }, 1000);
            }
            cookiesShow();
        }
        const cookiesHide = () => {
            cookiesModal.style.transform = 'translate(-50%, -50%) scale(0)'
            cookiesOverlay.style.display = 'none'
            document.querySelector('html').style.overflowY = 'scroll';
        }
        const accepted = () => {
            cookiesStatus = true;
            cookiesHide()
        }
        const rejected = () => {
            cookiesHide()
        }
        acceptCookies.addEventListener('click', accepted)
        rejectCookies.addEventListener('click', rejected)
        customizeCookies.addEventListener('click', () => {
            location.href = 'cookies edit page'
        })
    }
    cookies()
}

main()
