//listen for submit
document.querySelector('#loan-form').addEventListener('submit',function(e){
    //Hide Results
    document.querySelector('#results').style.display = 'none';

    //Show loader
    startLoading();

    setTimeout(calculateResults, 2000);


    e.preventDefault();
});

function startLoading(){
    document.querySelector('#loading').style.display = 'block';
    document.querySelector('.btn').disabled = true;
}

function stopLoading(){
    document.querySelector('#loading').style.display = 'none';
    document.querySelector('.btn').disabled = false;
}

function calculateResults(){
    const UIamount = document.querySelector('#amount');
    const UIinterest = document.querySelector('#interest');
    const UIyears = document.querySelector('#years');
    const UImonthlyPayment = document.querySelector('#monthly-payment');
    const UItotalPayment = document.querySelector('#total-payment');
    const UItotalInterest = document.querySelector('#total-interest');

    const principal = parseFloat(UIamount.value);
    const calculatedInterest = parseFloat(UIinterest.value) / 100 / 12;
    const calculatedPayments = parseFloat(UIyears.value) * 12;

    //compute the monthly payment
    const x = Math.pow(1+calculatedInterest, calculatedPayments);
    const monthy = (principal * x * calculatedInterest) / (x-1);

    if(isFinite(monthy)){
        UImonthlyPayment.value = monthy.toFixed(2);
        UItotalPayment.value = (monthy * calculatedPayments).toFixed(2);
        UItotalInterest.value = ((monthy * calculatedPayments) - principal).toFixed(2);


        //show result and hide loading
        document.querySelector('#results').style.display = 'block';
        stopLoading();
    }else{
        document.querySelector('#results').style.display = 'none';
        stopLoading();
        showError('Please check your numbers');
    }
    
}

function showError(err){
    const errElement = document.createElement('div');
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    errElement.className='alert alert-danger';
    errElement.appendChild(document.createTextNode(err));

    card.insertBefore(errElement,heading);

    //clear error after 3 sec
    setTimeout(clearError, 3000);

}

function clearError(){
    document.querySelector('.alert').remove();
}