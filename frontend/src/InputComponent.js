import React, { useState } from 'react'
import Axios from 'axios';

export default function InputComponent() {
    const [email, setEmail] = useState('');
    const [gitlink, setGitlink] = useState('');
    const [usergitlink, setUsergitlink] = useState('');

    const registration = async (event) => {
        event.preventDefault();


        const formData = { email: email, gitlink: gitlink }

        console.log(email, gitlink)

        await Axios.post("http://localhost:3001/register", formData).then((response) => {
            if (response.data.message == 'success') {
                console.log("Data was sent successfully");
            }
            else if (response.data.message == 'error') {
                console.log('Enternal server error');
            }
            else if (response.data.message == 'duplicate email') {
                console.log('duplicate email');
            }
            else {
                console.log('unknown error');
            }
        }).catch((error) => {
            console.log('An error occurred while sending the data:');
        });

        setEmail('');
        setGitlink('');
        document.getElementById("form1").reset();
    }

    const getinfo = async (event) => {
        event.preventDefault();

        const formData = { email: email }

        await Axios.post("http://localhost:3001/getinfo", formData).then((response) => {
            if (response.data.message == 'error') {
                console.log('Enternal server error');
            }
            else {
                setUsergitlink(response.data.gitlink);
            }
        }).catch((error) => {
            console.log('An error occurred while sending the data:');
        });
        setEmail('');
        document.getElementById("form2").reset();
    }


    const deletebyemail = async (event) => {
        event.preventDefault();

        const formData = { email: email };
        console.log(email);

        await Axios.post("http://localhost:3001/delete", formData).then((response) => {
            if (response.data.message == 'error') {
                console.log('Enternal server error');
            }
            else {
                document.getElementById('deleteMessage').innerHTML = 'Successfully deleted where email=' + email;
            }
        }).catch((error) => {
            console.log('An error occurred while sending the data:');
        });

        setEmail('');
        document.getElementById("form3").reset();
    }


    const getalldata = async (event) => {
        event.preventDefault();

        await Axios.post("http://localhost:3001/alldata").then((response) => {
            if (response.data.message == 'error') {
                console.log('Enternal server error');
            }
            else {
                console.log(response.data);
            }
        }).catch((error) => {
            console.log('An error occurred while sending the data:');
        });
    }



    return (
        <>
            <div style={{ margin: '50px' }}>
                <h1>Registration</h1>
                <form id='form1' onSubmit={registration}>
                    <div className='row'>
                        <label className='col-sm-2'>Email:</label>
                        <input className='col-sm-6' type="text" onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <br />

                    <div className='row'>
                        <label className='col-sm-2'>GitLink:</label>
                        <input type="text" className='col-sm-6' onChange={(e) => setGitlink(e.target.value)} />
                    </div>
                    <br />

                    <div className='row'>
                        <input className='col-sm-4' type="submit" />
                    </div>
                </form>


                <br /><br />
                <h1>Login</h1>
                <form id='form2' onSubmit={getinfo}>
                    <div className='row'>
                        <label className='col-sm-2'>Email:</label>
                        <input className='col-sm-6' type="text" onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <br />
                    <div className='row'>
                        <input className='col-sm-4' type="submit" />
                    </div>
                    <h6>Github Link: {usergitlink}</h6>
                </form>


                <br /><br />
                <h1>Delete</h1>
                <form id='form3' onSubmit={deletebyemail}>
                    <div className='row'>
                        <label className='col-sm-2'>Email:</label>
                        <input className='col-sm-6' type="text" onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <br />
                    <div className='row'>
                        <input className='col-sm-4' type="submit" />
                    </div>
                    <h6 id='deleteMessage'></h6>
                </form>

                <br /><br />
                <h1>All Data inn Console</h1>
                <div className='row'>
                    <button className='col-sm-4' onClick={getalldata}>Get All Data</button>
                </div>
            </div>

        </>
    )
}
