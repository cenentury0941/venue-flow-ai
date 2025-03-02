import Toolbar from "@/components/toolbar";

const Layout = ({ children }) => {
  return (
    <div>
      <Toolbar />
      <main style={{ padding: '20px' }}>
        {children} {/* Render page content here */}
      </main>
      <footer style={{ padding: '10px', backgroundColor: '#333', color: '#fff', textAlign: 'center' }}>
        &copy; 2025 My App
      </footer>
    </div>
  );
};

export default Layout;
