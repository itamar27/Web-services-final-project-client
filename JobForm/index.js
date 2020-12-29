$(document).ready(() => {

    numOfClicks = 1;

    const urlParams = new URLSearchParams(window.location.search);
    const owner_id = urlParams.get('id');
    const title = urlParams.get('title');

    console.log(title);

    $("#add-goal").click(() => {


    })


    $("#delete-goal").click(() => {

    })
})