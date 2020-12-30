const get_url = 'http://localhost:3000/api/jobs/'

$(document).ready(() => {


    const urlParams = new URLSearchParams(window.location.search);
    const job_id = urlParams.get('job_id');
    console.log(job_id);
    getJobDetails(job_id);



})


const getJobDetails = (job_id) => {

    $.ajax({
        url: get_url + `${job_id}`,
        type: 'GET',
        success: (job) => {
            console.log(job);
        }
    });
}