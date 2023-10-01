let popupTimeout;

async function PopUpMessage(message) {
    console.log('message popped');

    // Remove the previous popup if it exists
    const previousPopup = document.getElementById("popupmessage-parent-div");
    if (previousPopup) {
        previousPopup.remove();
        clearTimeout(popupTimeout);
    }

    // Create a div element for the pop-up message
    const PopUpmessagediv = `
        <div class="fixed top-0  z-[100] left-[30%]  bg-white md:w-[500px] text-center w-[90%]  mt-[2%] rounded shadow p-[10px]" id="popupmessage-parent-div" style="display:block;">
            <h1 class="font-semibold text-black">${message}</h1>
        </div>
    `;

    // Append the pop-up message to the body
    document.querySelector("body").insertAdjacentHTML('beforeend', PopUpmessagediv);

    // After 3 seconds, remove the pop-up message
    popupTimeout = setTimeout(() => {
        const popupParentDiv = document.getElementById("popupmessage-parent-div");
        if (popupParentDiv) {
            popupParentDiv.style.display = "none";
        }
    }, 3000);
}
