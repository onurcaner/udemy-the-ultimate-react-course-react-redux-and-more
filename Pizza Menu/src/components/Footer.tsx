export function Footer() {
  const now = new Date();
  return (
    <footer className="footer">
      <p>{now.getTime()} We are currently open</p>
    </footer>
  );
}
