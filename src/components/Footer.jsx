function Footer() {
  const linkStyle = {
    textDecoration: 'none',
    margin: '0 5px',
    color: 'inherit'
  };

  return (
    <h3 className="footer">
      Made with ❤️ by 
      <a 
        href="https://github.com/idevanshu" 
        title="github.com/idevanshu" 
        target="_blank" 
        rel="noopener noreferrer"
        style={linkStyle}
      >
        Devanshu Panigrahi
      </a>
      {' '}and{' '}
      <a 
        href="https://github.com/kamalnayan10" 
        title="github.com/kamalnayan10" 
        target="_blank" 
        rel="noopener noreferrer"
        style={linkStyle}
      >
        Kamalnayan Pathak
      </a>
    </h3>
  );
}

export default Footer;
