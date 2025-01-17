import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../globals'
import { PROFILE_CARDS_BY_HANDLE, SET_USER } from '../store/types'

const Users = (props) => {
  const history = useNavigate()
  const { user, currentUserData, selectedUser, currentUser, appDispatch } =
    props

  const [profile, setProfile] = useState(user)

  const [users, setUsers] = useState([])

  const getUsers = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/home`)
      setUsers(res.data)
    } catch (error) {
      console.log(error)
    }

    console.log()
  }
  const getUser = (user) => {
    appDispatch({ type: SET_USER, payload: user })
    appDispatch({ type: PROFILE_CARDS_BY_HANDLE, payload: user })
    console.log(user)
    history(`/user/${user.id}`)
  }

  const backToHome = async () => {
    return currentUserData !== null
      ? history(`/home/${currentUser.handle}`)
      : currentUserData === null
      ? history(`/login`)
      : history(`/login`)
  }

  useEffect(() => {
    getUsers()
  }, [selectedUser])

  return (
    <div>
      <button
        onClick={(e) => {
          backToHome(e)
        }}
      >
        Back
      </button>
      {users.length ? (
        <div class="profile-list-container">
          {users.map((user, idx) => (
            <div class="profile-main-container" key={`${user.idx}`}>
              <p>{user.handle}</p>
              <button class="profile-button-list" onClick={() => getUser(user)}>
                <img
                  class="profile-img-list"
                  src={user.avatarUrl}
                  alt={`Your avatar ${user.handle}`}
                ></img>
              </button>
              {console.log(user.avatarUrl)}
              <p>{user.caption}</p>
              <p>{user.genStatus}</p>
              <p>{user.triviaTotal}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>'no users.'</p>
      )}
    </div>
  )
}
export default Users
