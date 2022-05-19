import {collection, orderBy, query, onSnapshot} from 'firebase/firestore'
import React, { useEffect, useState } from "react";
import {db} from '../firebaseConfig'

const Therapeias = () => {
  const [therapeias, setTherapeias] = useState([]);

  useEffect(() => {
    const therapeiaRef = collection(db, "therapeia")
    const q = query(therapeiaRef, orderBy("createdAt", "desc"))
    onSnapshot(q, (snapshot) => {
      console.log(snapshot)
    })
    onSnapshot(q, (snapshot) => {
      const therapeias =  snapshot.docs.map((doc) => ({
        id: doc.id, 
        ...doc.data(),
      }))

      setTherapeias(therapeias)
    })
  }, [])

  return (
    <div>
      { therapeias.length === 0 ? (
        <p>No therapeias</p>
      )  : (
        therapeias.map(({id, title, description, imageUrl, createdAt}) => (
        <div key={id} >
          <div >
            <div >
              <img src={imageUrl} alt="title" style={{height:180, width:180}}/>
            </div>
            <div>
              <h2>{title}</h2>
              <p>{createdAt.toDate().toDateString()}</p>
              <h4>{description}</h4>
            </div>
          </div>
        </div>
        ))
      )}
    </div>
  )
}

export default Therapeias