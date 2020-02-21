import {
  Args,
  Mutation,
  Query,
  Resolver,
  Subscription,
  Parent,
  ResolveProperty,
} from '@nestjs/graphql';

@Resolver()
export class AuthorsResolver {
  authors = [
    {
      id: 1,
      firstName: 'Bill',
      lastName: 'Nguyen',
    },
    {
      id: 2,
      firstName: 'Minh',
      lastName: 'Nguyen',
    },
    {
      id: 3,
      firstName: 'Kevin',
      lastName: 'Nguyen',
    },
    {
      id: 4,
      firstName: 'Nhan',
      lastName: 'Nguyen',
    },
  ];

  postsfeed = [
    {
      id: 1,
      title: 'sample',
      votes: 0,
      authorID: 1,
    },
  ];

  @Query()
  greeting() {
    return 'Author API';
  }

  @Query()
  async author(@Args('id') id: number) {
    return this.authors.find(a => a.id === id);
  }
  /*
  @ResolveProperty()
  async posts(@Parent() author) {
    const { id } = author;
    console.log(id);
    return this.postsfeed.find(p => p.authorID === id);
  }*/
}
