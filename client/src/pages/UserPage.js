import React from 'react'
import axios from 'axios'
import { useEffect, useReducer } from 'react'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../globals'
import {
  PROFILE_CARDS_BY_HANDLE,
  SET_USER,
  SET_USER_PROFILE
} from '../store/types'

const iState = {
  profileCard: []
}
const reducer = (state, action) => {
  switch (action.type) {
    case SET_USER_PROFILE:
      return { ...state, profileCard: action.payload }
    default:
      return state
  }
}
const Users = (props) => {
  const [state, dispatch] = useReducer(reducer, iState)

  const history = useNavigate()

  const { selectedUser, appDispatch } = props

  const getUser = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/home/users/${selectedUser.handle}`
      )
      if (!selectedUser && res.data) {
        appDispatch({ type: SET_USER, payload: res.data })
        appDispatch({
          type: PROFILE_CARDS_BY_HANDLE,
          payload: res.data.ProfileCard
        })
        console.log(res.data)
      } else if (selectedUser && selectedUser.handle !== res.data.handle) {
        appDispatch({ type: SET_USER, payload: res.data })
        appDispatch({
          type: PROFILE_CARDS_BY_HANDLE,
          payload: res.data.ProfileCard
        })
      }
    } catch (error) {
      console.log(error)
    }

    console.log()
  }

  const getProfileCardByHandle = async () => {
    const res = await axios.get(`${BASE_URL}/home/users/${selectedUser.handle}`)
    dispatch({ type: SET_USER_PROFILE, payload: res.data.ProfileCard })
    appDispatch({
      type: PROFILE_CARDS_BY_HANDLE,
      payload: res.data.ProfileCard
    })
  }

  const backToHome = async () => {
    history(`/users`)
  }

  useEffect(() => {
    getUser()
    getProfileCardByHandle()
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
      <div class="profile-list-container">
        <div class="profile-main-container">
          <p>{selectedUser.handle}</p>
          <button class="profile-button-list">
            <img
              class="profile-img-list"
              src={selectedUser.avatarUrl}
              alt={`Your avatar ${selectedUser.handle}`}
            ></img>
          </button>
          {console.log(selectedUser)}
          <p>{selectedUser.caption}</p>
          <p>{selectedUser.genStatus}</p>
          <p>{selectedUser.triviaTotal}</p>
        </div>
      </div>
    </div>
  )
}
export default Users
