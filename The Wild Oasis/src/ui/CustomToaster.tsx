import { Toaster } from 'react-hot-toast';

export function CustomToaster(): JSX.Element {
  return (
    <Toaster
      position="top-center"
      gutter={12}
      containerStyle={{ margin: '1rem' }}
      toastOptions={{
        success: { duration: 4 * 1000 },
        error: { duration: 10 * 1000 },
        style: {
          fontSize: '1rem',
          lineHeight: '1.7rem',
          color: 'var(--color-grey-700)',
          maxWidth: '65ch',
          padding: '1rem 2rem',
          backgroundColor: 'var(--color-grey-0)',
          border: '1px solid var(--color-grey-100)',
          borderRadius: 'var(--border-radius-md)',
          boxShadow: 'var(--shadow-md)',
        },
      }}
    />
  );
}
