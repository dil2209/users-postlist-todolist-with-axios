import React from 'react'
import SelectUser from './selectUser'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

export default function PostModal({isOpen, toggle, save, loading}) {

   return (
   <Modal isOpen={isOpen} toggle={toggle}>
   <ModalHeader>
    Add new post
   </ModalHeader>
   <ModalBody>
    <form onSubmit={save} id={'newPost'}> 
    <input   className='form-control my-2' placeholder="Title" type='text' name='title'/>
      <SelectUser name={'user'}/>
     <textarea  type="textarea" className='form-control my-2' placeholder="Body..." name='post-body'></textarea>
   </form>

   </ModalBody>
   <ModalFooter>
    <button className='btn btn-success' disabled={loading} type={'submit'} form={'newPost'}>Save</button>
    <button className='btn btn-danger' onClick={toggle}>Cancel</button>
   </ModalFooter>


   </Modal>
  )
}
