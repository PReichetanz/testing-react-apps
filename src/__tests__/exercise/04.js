// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../../components/login'
import faker from 'faker'

const buildLoginForm = () => {
  const username = faker.internet.userName()
  const password = faker.internet.password()

  return {username, password}
}

test('submitting the form calls onSubmit with username and password', async () => {
  const user = userEvent.setup()
  const {username, password} = buildLoginForm()
  // 🐨 create a variable called "submittedData" and a handleSubmit function that
  // accepts the data and assigns submittedData to the data that was submitted
  // 💰 if you need a hand, here's what the handleSubmit function should do:
  // const handleSubmit = data => (submittedData = data)
  const handleSubmit = jest.fn()
  //
  // 🐨 render the login with your handleSubmit function as the onSubmit prop
  render(<Login onSubmit={handleSubmit} />)
  //
  // 🐨 get the username and password fields via `getByLabelText`
  const usernameInput = screen.getByLabelText('Username')
  const passwordInput = screen.getByLabelText('Password')
  // 🐨 use `await userEvent.type...` to change the username and password fields to
  //    whatever you want

  await user.type(usernameInput, username)
  await user.type(passwordInput, password)
  //
  // 🐨 click on the button with the text "Submit"
  await user.click(screen.getByRole('button', {name: 'Submit'}))
  //
  // assert that submittedData is correct
  // 💰 use `toEqual` from Jest: 📜 https://jestjs.io/docs/en/expect#toequalvalue
  expect(handleSubmit).toHaveBeenCalledWith({
    username: username,
    password: password,
  })
  expect(handleSubmit).toHaveBeenCalledTimes(1)
})

/*
eslint
  no-unused-vars: "off",
*/
