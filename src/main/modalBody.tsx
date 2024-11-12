import React from "react";

interface ModalBodyProps {
  title: string;
  body?: any;
  onDismiss: () => void;
}
export const ModalBody = (props: ModalBodyProps) => {
  const {title, body, onDismiss} = props;
  return (
    <div style={{
      margin: 15,
      backgroundColor: 'white',
      opacity: 0.9,
      borderWidth: 1,
      borderRadius: 4,
      borderColor: 'gray',
      padding: 20,
    }}>
      <div style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>
        {title}
      </div>
      <div style={{marginTop: 20}}>{body ?? null}</div>
      <div
        onClick={onDismiss}
        style={{alignSelf: 'flex-end', marginTop: 16}}>
        <div style={{color: '#23569E', fontWeight: 'bold', fontSize: 16}}>
          OK
        </div>
      </div>
    </div>
  );
};

export const Loader = ({
  offset,
  batchSize,
}: {
  offset: number;
  batchSize: number;
}) => (
  <>
    <div style={styles.container}>
      {/* <ActivityIndicator size={'large'} /> */}

      <div style={{color: 'gray', margin: 10}}>
        Generating the tests for components
        <span style={{fontWeight: 'bold', color: 'black'}}>
          {`:  ${offset} to ${offset + batchSize}`}
        </span>
      </div>
    </div>
  </>
);

const styles = {
  container: {
    margin: 15,
    backgroundColor: 'white',
    opacity: 0.9,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: 'gray',
    padding: 20,
  },
};
