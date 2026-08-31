'use client'

import { Modal } from './Modal'
import { Clip } from '@/app/api/clips'
import { useState, useCallback } from 'react'

interface IAssetModalProps {
  initialIsOpen?: boolean;
  clip: Clip;
}

export const AssetModal = ({ 
  initialIsOpen = false, 
  clip 
}: IAssetModalProps) => {
  const [isOpen, setIsOpen] = useState(initialIsOpen)
  
  
  const handleClose = useCallback(() => {
    setIsOpen(false)
  }, [])
  
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={handleClose} 
      clip={clip} 
    />
  )
}