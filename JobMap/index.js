const get_url = 'https://freelancerjobmap.herokuapp.com/api/jobs/'

$(document).ready(() => {


    const urlParams = new URLSearchParams(window.location.search);
    const job_id = urlParams.get('job_id');
    getJobDetails(job_id);
})

const createJobMap = (job) => {
    console.log(job);
    const project_name = $('#title');
    project_name[0].innerText = job.project_name;
    console.log(job.project_name);

}


const getJobDetails = (job_id) => {

    $.ajax({
        url: get_url + `${job_id}`,
        type: 'GET',
        success: (job) => {
            createJobMap(job);
        }
    });
}