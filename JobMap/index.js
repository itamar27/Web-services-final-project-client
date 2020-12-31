const get_url = 'https://freelancerjobmap.herokuapp.com/api/jobs/'


$(document).ready(() => {

    const urlParams = new URLSearchParams(window.location.search);
    const job_id = urlParams.get('job_id');
    getJobDetails(job_id);

})

const createJobMap = (job) => {

    createHeader(job.project_name);

    let phases = new Array();
    job.goals.sort((a, b) => { a.phase > b.phase });

    job.goals.forEach(goal => {
        let exist = false;
        phases.forEach(number => { exist = number == goal.phase ? true:false});
        

        if (!exist){
            phases.push(goal.phase);
            createPhase(goal.phase);
        }
            

        const currPhase = $(`#phase-${goal.phase}`);
        currPhase.append(buildgoal(goal));
    })
}

const createHeader = (title) => {
    const header = `<div class="jumbotron jumbotron-fluid">
                        <h3 class="row" id="title"><b>${title}</b></h3>
                    </div>`;

    const phases = `<div class="phases" id="phases">
                    </div>`;

    $('#root').append(header);
    $('#root').append(phases);


}

const buildgoal = (goal) => {
    let cardClass = "card text-center";

    if (goal.meaningful)
        cardClass += " meaningful"

    return `<div class="${cardClass}">
                <div class="card-body">
                    <h5 class="card-title">${goal.name}</h5>
                    <p class="card-text">${goal.description}</p>
                    <a href="#" class="btn btn-primary">see coments</a>
                    <div class="progress">
                        <div class="progress-bar text-center" role="progressbar" style="width: ${goal.progress}%;" aria-valuenow="${goal.progress}" aria-valuemin="0" aria-valuemax="100">${goal.progress}%</div>
                    </div>

                </div>
            </div>`;
}


const createPhase = (phaseNumber) => {
    let phase = `<label class="phase-label">phase ${phaseNumber}</label>
                <section class="phase" id="phase-${phaseNumber}">
                </section>`;

    $('#phases').append(phase)
}


const getJobDetails = (job_id,description) => {
    $.ajax({
        url: get_url + `${job_id}`,
        type: 'GET',
        success: (job) => {
            createJobMap(job,description);
        }
    });
}

