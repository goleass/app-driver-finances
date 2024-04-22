import {
  DashboardPage,
  DashboardPageHeader,
  DashboardPageHeaderNav,
  DashboardPageHeaderTitle,
  DashboardPageMain,
} from '@/components/dashboard/page'

import { getUserMovements } from './actions'
import { ExampleChart, ExampleChart2 } from './_components/charts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default async function Page() {
  const movements = await getUserMovements()

  const entradas = movements.filter((m) => m.type === 'Entrada')
  const saidas = movements.filter((m) => m.type === 'Saida')

  const aplicativo = movements.filter((m) => m.category === 'Aplicativo')
  const manutencao = movements.filter((m) => m.category === 'Manutencao')
  const combustivel = movements.filter((m) => m.category === 'Combustivel')

  return (
    <DashboardPage>
      <DashboardPageHeader>
        <DashboardPageHeaderTitle>Tarefas</DashboardPageHeaderTitle>
        <DashboardPageHeaderNav>
          <DashboardPageHeaderNav>
            {' '}
            teste
            {/* <TodoUpsertSheet>
              <Button variant="outline" size="sm">
                <PlusIcon className="w-4 h-4 mr-3" />
                Add Movimento
              </Button>
            </TodoUpsertSheet> */}
          </DashboardPageHeaderNav>
        </DashboardPageHeaderNav>
      </DashboardPageHeader>
      <DashboardPageMain className="flex gap-3 flex-col sm:flex-row">
        <Card>
          <CardHeader>
            <CardTitle>Geral</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <ExampleChart
              series={[
                entradas.reduce((a, b) => a + b.value, 0),
                saidas.reduce((a, b) => a + b.value, 0),
              ]}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Categorias</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <ExampleChart2
              series={[
                aplicativo.reduce((a, b) => a + b.value, 0),
                manutencao.reduce((a, b) => a + b.value, 0),
                // aluguel.reduce((a, b) => a + b.value, 0),
                combustivel.reduce((a, b) => a + b.value, 0),
              ]}
            />
          </CardContent>
        </Card>
        {/* <MovementsDataTable data={movements} /> */}
      </DashboardPageMain>
    </DashboardPage>
  )
}
