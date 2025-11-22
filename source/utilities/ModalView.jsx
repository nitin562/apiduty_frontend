import {Modal, Pressable, Text, View} from "react-native"
import {ModalTheme} from "../theme.js"
import React, {createContext, useContext, useEffect, useState} from 'react';

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

// for calling outside the jsx components ----------------
let modalFunctions = {};

export const setModalRef = (ref) => {
  modalFunctions = ref;
};

export const showGlobalModal = (message, icon = 'help-circle') => {
  modalFunctions.showModal?.(message, icon);
};
// ---------------------

const ModalProvider = ({children}) => {
  const [modalData, setModalData] = useState({
    show: false,
    message: '',
    icon: 'help-circle',
  });

  const showModal = (message, icon = 'help-circle') => {
    setModalData({show: true, message, icon});
  };

  const hideModal = () => {
    setModalData(prev => ({...prev, show: false}));
  };

  return (
    <ModalContext.Provider value={{showModal, hideModal}}>
      {children}
      <ModalView
        show={modalData.show}
        hideModal={hideModal}
        message={modalData.message}
        icon={modalData.icon}
      />
    </ModalContext.Provider>
  );
};

export function ModalView({show, hideModal, message, icon="help-circle"}) {
  const doClose = () =>{
    hideModal()
  }
  useEffect(()=>{
    if(show){
      setTimeout(()=>{
        hideModal()
      }, 2000)
    }
  },[show, hideModal])
  return (
    <Modal
          animationType="fade"
          transparent={true}
          visible={show}
          onRequestClose={doClose}>
            <View className="flex-1 bg-transparent p-6 py-10 items-center justify-end shadow-lg">
              <Pressable onPress={doClose} className="w-full py-3 rounded-full flex flex-row items-center p-2 gap-3" 
              style={{backgroundColor: ModalTheme.backgroundColor}}>
                {/* <Ionicons name={icon}/> */}
                <Text className="text-md text-center flex-1" style={{
                  fontFamily: ModalTheme.font,
                  color: ModalTheme.textColor
                }}>
                  {message}
                </Text>
              </Pressable>

            </View>
        </Modal>
  )
}

export default ModalProvider