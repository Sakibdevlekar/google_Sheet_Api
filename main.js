const {google}= require('googleapis');
const key = require('./keys.json');




const client = new google.auth.JWT(
    key.client_email,
    null,
    key.private_key,
    ['https://www.googleapis.com/auth/spreadsheets'] // scope of the app https://developers.google.com/identity/protocols/oauth2/scopes#sheets
);

client.authorize(function(err,tokens){

    if(err){
        console.log(err);
        return;
    }else{
        console.log('connected!')
        gsRun(client);
    }

});

//get data  from sheet 
async function gsRun(client){
    
    const gsApi = google.sheets({version:'v4',auth:client});
    // const opt = {
    //     spreadsheetId:'119gDcIeYaoS7K63btfj1KjbjyKqEFG4iDFhOjD1FvRI', // spreadsheetId
    //     range: 'Data!A1:B5' // range of data
    // };

    // let data = await gsApi.spreadsheets.values.get(opt);  // get 
    // console.log(data.data.values);




let newDataArray= [['Nifty50','17,427.95','17,428.05','17,312.75' ,'17,398.05','38.30', '0.30%' ],      //sample data  for inset
['HEROMOTOCO','2,385.00','2,434.50	','2,372.05	' ,'2,429.00','81.65', '0.80%' ]
];



//Insert data in to  sheet //
    const updateOption= {
        spreadsheetId:'119gDcIeYaoS7K63btfj1KjbjyKqEFG4iDFhOjD1FvRI', // spreadsheetId
        range: 'Data!A2',
        valueInputOption:'USER_ENTERED',
        resource: {values:newDataArray}
    };

    let res = await gsApi.spreadsheets.values.update(updateOption); // post
    console.log(res);


};