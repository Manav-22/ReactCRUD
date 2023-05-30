import React, { useState, useEffect } from "react";

export function Username() {

    const [info, setInfo] = useState({
        fname: "",
        lname: "",
        email: "",
        password: "",
        birthdate: "",
        phone: "",
        gender: "",
        Hobby: "",
    })
    console.log(info);

    const [search, setSearch] = useState(JSON.parse(localStorage.getItem("Searchdata")) || []);

    const [update, setUpdate] = useState(-1);

    function Change(e) {
        console.log(e.target);
        let { name, value } = e.target;
        setInfo({ ...info, [name]: value })
    }

    function Data(e) {
        console.log(e.target);
        if (update === -1) {
            setSearch([...search, info]);
            localStorage.setItem("Searchdata", JSON.stringify([...search, info]));
        }
        else {
            const Store = search.map((item, index) => {
                if (update === index) { return info }
                return item
            })
            setSearch(Store);
            localStorage.setItem("Searchdata", JSON.stringify(Store));
        }
    }

    const handledelete = (idx) => {
        const Deleterecord = search.filter((item, index) => index !== idx);
        setSearch(Deleterecord);
        localStorage.setItem("Searchdata", JSON.stringify(Deleterecord));
    }

    const handleEdit = (inx) => {
        const Editrecord = search.find((item, index) => { return index === inx });
        setUpdate(inx);
        setInfo(Editrecord);
    }

    const handleSelect = (e) => {
        const { name, checked } = e.target;
        if (name === "select") {
            const checkedvalue = search.map((user) => { return { ...user, isChecked: checked } })
            console.log(checkedvalue);
            setSearch(checkedvalue);
        }
        else {
            const checkedvalue = search.map((user) => {

                if (user?.fname === e.target.name) {
                    return{...user, isChecked: e.target.checked }
    }

                else { return user }

});

setSearch(checkedvalue);
        }
    }

useEffect(() => {
   console.log("welcome")
}, []);

return (
    <>
        <div>
            <h1>Welcome To React Crud</h1>
            <h2>Registration Form : </h2>

            <label htmlFor="text">First Name : </label>
            <input type="text" id="fname" name="fname" value={info.fname} onChange={Change} placeholder="Enter Your Firstname" /><br /><br />

            <label htmlFor="text">Last Name : </label>
            <input type="text" id="lname" name="lname" value={info.lname} onChange={Change} placeholder="Enter Your Lastname" /><br /><br />

            <label htmlFor="email">Email : </label>
            <input type="email" id="email" name="email" value={info.email} onChange={Change} placeholder="Enter Your Email" /><br /><br />

            <label htmlFor="password">Password : </label>
            <input type="password" id="password" name="password" value={info.password} onChange={Change} placeholder="Enter Your Password" /><br /><br />

            <label htmlFor="birthdate">Birthdate : </label>
            <input type="date" id="birthdate" name="birthdate" value={info.birthdate} onChange={Change} /><br /><br />

            <label htmlFor="phone">Phone Number : </label>
            <input type="tell" id="phone" name="phone" value={info.phone} onChange={Change} placeholder="Enter Your Phonenumber" /><br /><br />

            <label htmlFor="gender">Gender : </label>
            <input type="radio" id="Male" name="gender" value="Male" />Male
            <input type="radio" id="Female" name="gender" value="Female" />Female<br /><br />

            <label htmlFor="hobby">Hobby : </label>
            <input type="checkbox" id="tenis" name="tenis" value="tenis" />Tenis
            <input type="checkbox" id="criket" name="criket" value="criket" />Criket
            <input type="checkbox" id="Football" name="Football" value="Football" />Football<br /><br />

            <label htmlFor="slect city">Select City : </label>
            <select>
                <option value="rajkot">Rajkot : </option>
                <option value="Ahemdabad">Ahemdabad : </option>
                <option value="Vadodra">Vadodra : </option>
                <option value="Junagadh">Junagadh : </option>
                <option value="surat">Surat : </option>
            </select><br /><br />

            <input type="submit" value="Registration" onClick={Data} />

            <table>
                <thead>
                    <th>
                        <input type="checkbox" name="select" checked={search.every((user) => user?.isChecked === true)} onChange={handleSelect} />
                    </th>
                    <th>First Name </th>
                    <th>Last Name </th>
                    <th>Email </th>
                    <th>Password </th>
                    <th>Birthdate </th>
                    <th>Phone </th>
                    <th>Delete </th>
                    <th>Edit</th>
                </thead>
                <tbody>
                    {search.map((item, inx) => {
                        return (
                            <tr>
                                <th><input type="checkbox" name={item.fname} checked={item?.isChecked || false} onChange={handleSelect} /></th>
                                <td>{item.fname}</td>
                                <td>{item.lname}</td>
                                <td>{item.email}</td>
                                <td>{item.password}</td>
                                <td>{item.birthdate}</td>
                                <td>{item.phone}</td>
                                <td><button type="button" onClick={() => handledelete(inx)}>Delete</button></td>
                                <td><button type="button" onClick={() => handleEdit(inx)}>Edit</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    </>
)
}
