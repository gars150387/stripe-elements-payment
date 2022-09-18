import { useState } from "react";

export const Login = ({ handleLongin }) => {

const [email, setEmail] = useState("")

    const handleSubmit = (event) => {
        event.preventDefault()
        event.stopPropagation()

       handleLongin( email )

    }
  return (
    <>
      <form onSubmit={ handleSubmit }>
        <input type="email" name="email" onChange={event => setEmail(event.target.value)} placeholder="Your email" />
        <input type="submit" value="login"/>
      </form>
    </>
  );
};
