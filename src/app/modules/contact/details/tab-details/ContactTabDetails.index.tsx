import React from 'react';

const ContactTabDetailsIndex: React.FC<{
  id?: string;
  item?: any;
  tab: any;
}> = ({id = '', tab, item}) => {
  const {Component = <></>} = tab as any;
  return <Component id={id} item={item} />;
};

export default ContactTabDetailsIndex;
