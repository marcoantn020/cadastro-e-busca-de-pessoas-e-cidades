import { FerramentasDeListagem } from '../../shared/components'
import { LayoutBaseDePagina } from '../../shared/layouts'


interface IDashboardProps {children?: React.ReactNode}
export const Dashboard: React.FC<IDashboardProps> = () => {

  return (
    <LayoutBaseDePagina 
      titulo='Página inicial'
      barraDeFerramentas={(
        <FerramentasDeListagem
          mostrarInputBusca
          textoDoBotaoNovo='Nova'
        />
      )}
    > 
      Testando
    </LayoutBaseDePagina>
  )
}