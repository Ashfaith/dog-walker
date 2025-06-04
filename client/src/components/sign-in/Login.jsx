function Login() {
  return (
    <>
      <h2>SIGN IN</h2>
      <form action="http://localhost:3000/auth/login" method="POST">
        <label for="username">Username</label>
        <input
          id="username"
          name="username"
          placeholder="username"
          type="text"
        />
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" />
        <button type="submit">Log In</button>
      </form>
    </>
  );
}

export default Login;
