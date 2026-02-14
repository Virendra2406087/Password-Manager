import React, { useEffect, useState } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import "react-toastify/dist/ReactToastify.css";

const Manager = () => {
  const [form, setForm] = useState({
    site: "",
    username: "",
    password: "",
  });

  const [passwordArray, setPasswordArray] = useState([]);
  const [showPass, setShowPass] = useState(false);
  useEffect(() => {
    const storedPasswords = localStorage.getItem("password");
    if (storedPasswords) {
      setPasswordArray(JSON.parse(storedPasswords));
    }
  }, []);
  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    toast("Copied to clipboard!", {
      position: "top-right",
      autoClose: 3000,
      theme: "dark",
      transition: Bounce,
    });
  };
  const togglePassword = () => {
    setShowPass((prev) => !prev);
  };
  const savePassword = () => {
    if (
      form.site.length > 3 &&
      form.username.length > 3 &&
      form.password.length > 3
    ) {
      const newEntry = { ...form, id: uuidv4() };
      const updatedArray = [...passwordArray, newEntry];
      setPasswordArray(updatedArray);
      localStorage.setItem("password", JSON.stringify(updatedArray));
      setForm({ site: "", username: "", password: "" });

      toast("Password saved!", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
        transition: Bounce,
      });
    } else {
      toast("Please fill all fields correctly!", {
        position: "top-right",
        autoClose: 3000,
        theme: "light",
        transition: Bounce,
      });
    }
  };
  const deletePassword = (id) => {
    if (confirm("Do you really want to delete this password?")) {
      const updated = passwordArray.filter((item) => item.id !== id);
      setPasswordArray(updated);
      localStorage.setItem("password", JSON.stringify(updated));

      toast("Password deleted!", {
        position: "top-right",
        autoClose: 3000,
        theme: "light",
        transition: Bounce,
      });
    }
  };
  const editPassword = (id) => {
    const itemToEdit = passwordArray.find((item) => item.id === id);
    setForm(itemToEdit);

    const updated = passwordArray.filter((item) => item.id !== id);
    setPasswordArray(updated);
    localStorage.setItem("password", JSON.stringify(updated));
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ToastContainer />

      <div className="containers">
        <div className="container">
          <div className="manager-header">
            <h1 className="logo">
              <span className="t1">&lt;</span>
              PassSafe
              <span className="t1">PRO/&gt;</span>
            </h1>
            <p className="textgreen">Your own Passop Manager</p>
          </div>
          <div className="manager">
            <input
              type="text"
              name="site"
              placeholder="Enter website URL"
              value={form.site}
              onChange={handleChange}
            />

            <div className="userinput">
              <input
                type="text"
                name="username"
                placeholder="Enter Username"
                value={form.username}
                onChange={handleChange}
              />

              <div className="pass">
                <input
                  type={showPass ? "text" : "password"}
                  name="password"
                  placeholder="Enter Password"
                  value={form.password}
                  onChange={handleChange}
                />

                <span className="show" onClick={togglePassword}>
                  <img
                    src={
                      showPass
                        ? "https://cdn-icons-png.flaticon.com/512/159/159078.png" 
                        : "https://tse3.mm.bing.net/th/id/OIP.S5tyITsrRYPrMa_mpN2ZMAHaHa?pid=Api&P=0&h=180"
                    }
                    alt={showPass ? "Hide password" : "Show password"}
                  />
                </span>
              </div>
            </div>

            <button id="button" onClick={savePassword}>
              Save Password
            </button>
          </div>
          <div className="password">
            <h2 className="yourpass">Your Password</h2>

            {passwordArray.length === 0 && <p>No password to show</p>}

            {passwordArray.length > 0 && (
              <div className="table-auto">
                <table>
                  <thead className="table">
                    <tr>
                      <th>Site</th>
                      <th>Username</th>
                      <th>Password</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody className="t-body">
                    {passwordArray.map((item) => (
                      <tr key={item.id}>
                        <td data-label="Site">
                          {item.site}
                          <img
                            id="copy"
                            src="https://cdn-icons-png.flaticon.com/512/1621/1621635.png"
                            alt="Copy"
                            onClick={() => copyText(item.site)}
                          />
                        </td>

                        <td data-label="Username">
                          {item.username}
                          <img
                            id="copy"
                            src="https://cdn-icons-png.flaticon.com/512/1621/1621635.png"
                            alt="Copy"
                            onClick={() => copyText(item.username)}
                          />
                        </td>

                        <td data-label="Password">
                          {item.password}
                          <img
                            id="copy"
                            src="https://cdn-icons-png.flaticon.com/512/1621/1621635.png"
                            alt="Copy"
                            onClick={() => copyText(item.password)}
                          />
                        </td>

                        <td data-label="Action">
                          <span onClick={() => editPassword(item.id)}>
                            <img
                              id="edit"
                              src="https://cdn-icons-png.flaticon.com/512/1159/1159633.png"
                              alt="Edit"
                            />
                          </span>

                          <span onClick={() => deletePassword(item.id)}>
                            <lord-icon
                              src="https://cdn.lordicon.com/skkahier.json"
                              trigger="hover"
                              colors="primary:#000"
                              style={{ width: "24px", height: "24px" }}
                            ></lord-icon>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Manager;
