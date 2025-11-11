import { Hobby } from '@/type';
import { Plus, Trash2 } from 'lucide-react';
import React, { useState } from 'react'

type Props = {
  hobbies: Hobby[];
  setHobbies: (hobbies: Hobby[]) => void;
};

const HobbyForm : React.FC<Props> = ({ hobbies, setHobbies }) => {

    const [newHobby, setNewHobby] = useState<Hobby>(
      {
        name: '',
      }
    )
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, fied: keyof Hobby) => {
      setNewHobby({ ...newHobby, [fied]: e.target.value })
    }

    const handleExistingChange = (index: number, field: keyof Hobby, value: string) => {
      const updatedHobbies = [...hobbies]
      updatedHobbies[index] = { ...updatedHobbies[index], [field]: value }
      setHobbies(updatedHobbies)
    }
  
    const handleAddHobby = () => {
      setHobbies([...hobbies, newHobby]);
      setNewHobby({ name: '' });
    }

    const handleDeleteHobby = (index: number) => {
      const updatedHobbies = hobbies.filter((_, i) => i !== index)
      setHobbies(updatedHobbies)
    }

  return (
    <div>
      {/* Afficher les loisirs existants */}
      {hobbies.map((hobby, index) => (
        <div key={index} className='flex items-center gap-2 mb-4 p-3 border border-primary rounded-lg'>
          <input
            type="text"
            placeholder="hobby"
            value={hobby.name}
            onChange={(e) => handleExistingChange(index, 'name', e.target.value)}
            className='input input-bordered input-sm w-full'
          />
          <button
            onClick={() => handleDeleteHobby(index)}
            className='btn btn-error btn-xs'
          >
            <Trash2 className='w-3' />
          </button>
        </div>
      ))}

      {/* Formulaire pour ajouter un nouveau loisir */}
      <input 
        type="text"
        placeholder="hobby"
        value={newHobby.name}
        onChange={(e) => handleChange(e, 'name')}
        className='input input-bordered w-full mt-4'
      />
      <button
        onClick={handleAddHobby}
        className='btn btn-primary mt-4'
      >
        Ajouter
        <Plus className='w-4' />
      </button>
    </div>
  )
}

export default HobbyForm
