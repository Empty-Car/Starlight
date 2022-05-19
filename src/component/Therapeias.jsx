import {collection, orderBy, query, onSnapshot} from 'firebase/firestore'
import React, { useEffect, useState } from "react";
import {db} from '../firebaseConfig'

const Therapeias = () => {
  const [therapeias, setTherapeias] = useState([]);

  useEffect(() => {
    const shortTextRef = collection(db, "therapeia" )
    const q = query(shortTextRef, orderBy("createdAt", "desc"))
    onSnapshot(q, (snapshot) => {
      const therapeia =  snapshot.docs.map((doc) => ({
        id: doc.id, 
        ...doc.data(),
      }))
      setTherapeias(therapeia)
    })
  }, [])
  
  useEffect(() => {
    console.log(therapeias);
  }, [therapeias])

  return (
    <div>
      { therapeias.length === 0 ? (
        <p>No therapeias</p>
      )  : (
        therapeias.map(({id, title, description, imageUrl, createdAt}) => (
        <div key={id} className="border mt-3 p-3 bg-light">
          <div className='row'>
            <div className='col-3'>
              <img src={imageUrl} alt="title" style={{height:180, width:180}}/>
            </div>
            <div className='col-9 ps-3'>
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