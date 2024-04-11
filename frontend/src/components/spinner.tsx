import spinner from '../assets/svg/spinner.svg'

function Spinner({ className}: {className:string}) {
  return (
    <div role="status">
      <img className={className} src={spinner}/>
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export default Spinner;
