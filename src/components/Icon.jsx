// Usa tu sprite public/img/icons.svg tal como estaba
export default function Icon({ name, className = '' }) {
  return (
    <svg className={`ic ${className}`.trim()} aria-hidden="true">
      <use href={`/images/icons.svg#i-${name}`} />
    </svg>  
  );
}
