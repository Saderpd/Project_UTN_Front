import perroEnTraje from '../assets/perroEnTraje.png'

function ErrorMessage({ message = 'Algo salió mal, intentá de nuevo' }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4">
      <img src={perroEnTraje} alt="Error" className="h-40 object-contain" />
      <p className="text-[#1C1C1C] font-medium">{message}</p>
    </div>
  )
}

export default ErrorMessage