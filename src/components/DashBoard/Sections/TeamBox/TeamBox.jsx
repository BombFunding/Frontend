import React from 'react'
import styles from "./TeamBox.module.scss"
import TeamItem from '../TeamItem/TeamItem'

const TeamBox = () => {
  return (
    <div className={styles.team_box}>
        <div className={styles.team_list}>
            <TeamItem />
            <TeamItem />
            <TeamItem />
            <TeamItem />
        </div>
    </div>
  )
}

export default TeamBox