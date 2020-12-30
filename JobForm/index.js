const get_url = 'localhost:3000/api/customers/';
const post_url = 'http://localhost:3000/api/jobs';
const freelancer_id = 1;
const counter = {}
counter.count = 1;




$(document).ready(() => {

    numOfClicks = 1;

    const urlParams = new URLSearchParams(window.location.search);
    const owner_id = urlParams.get('id');
    const title = urlParams.get('title');
    const price = urlParams.get('price');
    const rawDate = urlParams.get('date');
    const date_array = rawDate.split('/');
    const date = `${date_array[1]}/${date_array[0]}/${date_array[2]}`;

    console.log(owner_id);
    //const customer = getCustomer(owner_id);
    const customer = {
        id: 2,
        name: 'itamar yarden',
        email: 'itamar@gmail.com'
    };

    $(`<h3 class="header text-center">${title}</3>`).appendTo('#title');
    $(`<p class="col-md-4 text-center"><b>publish date</b></br>${date}</p>`).appendTo("#info");
    $(`<p class="col-md-4 text-center"><b>price</b></br>${price}</p>`).appendTo("#info");
    $(`<p class="col-md-4 text-center"><b>Customer personal details</b></br>${customer.name} - ${customer.email}</p>`).appendTo("#info");

    addGoal(counter);
    deleteGoal(counter);
    $('#submit').on('click', () => {
        submitForm(owner_id, freelancer_id, price, date);
    });

});

const addGoal = (counter) => {

    $('#add-goal').on('click', () => {

        if (counter.count == 10) {
            console.log("Can't create more than 10 goals");
            return;
        }
        const duplicator = $(`#duplicator-${counter.count}`).clone(true);

        const appendable = `duplicator-`;
        duplicator[0].id = appendable + `${counter.count + 1}`
        $(duplicator).insertAfter('#' + appendable + `${counter.count++}`);
    });

}

const deleteGoal = (counter) => {

    $('#delete-goal').on('click', () => {
        console.log(counter.count);

        const goals = $('#goals');
        const lastChild = goals[0].lastElementChild;
        if (lastChild.id == 'duplicator-1')
            console.log(`can't delete this object -  ${lastChild.id}`);
        else {
            counter.count--;
            goals[0].removeChild(lastChild);
        }

    })
}

const submitForm = (owner_id, freelancer_id, price, startDate) => {
    const project_name = $('#project-name').val();
    const Deadline = $('#deadline').val();
    const date_array = Deadline.split('-');
    const deadline = `${date_array[1]}/${date_array[2]}/${date_array[0]}`;
    const goalsChild = Array.from($('#goals').children());

    const goals = [];

    goalsChild.forEach(goal => {

        const phase = $(`#${goal.id} .phase`).val();
        const name = $(`#${goal.id} .name`).val();
        const description = $(`#${goal.id} .description`).val();
        const bool = $(`#${goal.id} .bool:checked`).val();
        let important = false;
        if (bool == 'on')
            important = true;

        const Goal = {};

        Goal.phase = phase;
        Goal.name = name;
        Goal.description = description;
        Goal.meaningful = important;


        goals.push(Goal);

    })

    updateUserById({ project_name, deadline, goals, owner_id, freelancer_id, price, startDate });
}



const getCustomer = (owner_id) => {
    $.ajax({
        url: get_url + `${owner_id}?owner=true`,
        type: 'GET',
        success: (jobs) => {
            createJobList(jobs);
        }
    });
}

function updateUserById(info) {
    console.log(info)
    $.ajax({
        url: post_url,
        type: 'POST',
        dataType: 'json',
        data: info,
        success: (job) => {
            window.location.href = `../JobMap/index.html?job_id=${job.id}`;
        }
    });
}