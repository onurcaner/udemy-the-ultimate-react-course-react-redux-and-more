import { CreateUser } from '../features/user/CreateUser';

export function Home(): JSX.Element {
  return (
    <div className="py-10 text-center">
      <h2 className="mb-12 text-2xl font-semibold sm:text-3xl">
        The best pizza.
        <br />
        <span className="text-yellow-500">
          Straight out of the oven straight to you.
        </span>
      </h2>

      <CreateUser />
    </div>
  );
}
