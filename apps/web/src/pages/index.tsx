import { Categories, TopBar } from '@/domains/home'

const Home = () => (
  <div className="flex flex-col gap-8">
    {/* TODO: Change after having authentication */}
    <TopBar name="Nnn" />
    <Categories />
  </div>
)

export default Home
