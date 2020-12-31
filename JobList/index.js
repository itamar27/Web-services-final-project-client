/*
 * Gloנal varible declarition 
 */

class JobInfo {
    constructor(owner_id, job_title, job_price, post_date) {
        this.owner_id = owner_id;
        this.job_title = job_title;
        this.job_price = job_price;
        this.post_date = post_date;
    }
}

/*
 * Gloנal varible declarition 
 */
let counter = 0;
const service_url = 'https://freelancerjobmap.herokuapp.com/api/externalApi/projects';
const render = '../JobForm/index.html';


/*
 * Job list functionality
 */

const appendDataToJobList = (data) => {

    const jobList = $('#job-list');

    const divHeader = document.createElement('div');
    const divInfo = document.createElement('div');
    const divButton = document.createElement('div');
    const li = document.createElement('li');

    const header = document.createElement('h4');
    const description = document.createElement('p');
    const category = document.createElement('p');
    const price = document.createElement('p');
    const date = document.createElement('p');

    const button = document.createElement('button');

    li.id = `job-item-${++counter}`;
    header.innerText = data.title;
    description.innerText = `Job Description: ${data.description}`;
    category.innerText = `Job category: ${data.job_category}`;
    price.innerHTML = `Job rate: ${data.price}${data.currency_code}`;
    date.innerHTML = `Post date :${data.time_submitted}`;
    button.innerHTML = `Accept`;

    header.classList.add('col-md-12', 'text-center');
    description.classList.add('col-md-4', 'text-center');
    category.classList.add('col-md-3', 'text-center');
    price.classList.add('col-md-3', 'text-center');
    date.classList.add('col-md-2', 'text-center');
    button.classList.add('btn', 'btn-primary');
    button.type = 'submit';
    button.id = `accept-${counter}`;
    button.addEventListener('click', () => {
        submit(li.id, data.owner_id);
    });

    divHeader.classList.add('row');
    divHeader.id = "header";
    divInfo.classList.add('row');
    divInfo.id = "info";
    divButton.classList.add('row-flex', 'text-center');
    li.classList.add('list-group-item');

    divHeader.append(header);
    divInfo.append(description, category, date, price);
    divButton.append(button)
    li.append(divHeader, divInfo, divButton);
    jobList.append(li);
}


const createJobList = (jobs) => {
    jobs.forEach(job => {
        appendDataToJobList(job);
    })

}

function getJobList() {
    $.ajax({
        url: service_url,
        type: 'GET',
        success: (jobs) => {
            createJobList(jobs);
        }
    });
}

function submit(selector, id) {

    const title = $(`#${selector}`).find('#header').find('h4').text();
    const info = $(`#${selector}`).find('#info').find('p')
    const price = info[3].innerText.split(':')[1];
    const date = info[2].innerText.split(':')[1];

    window.location.href = render + `?id=${id}&title=${title}&price=${price}&date=${date}`;
}

/*
 * Events on page load
 */

$(document).ready(() => {
    getJobList();

})