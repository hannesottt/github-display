export class GitHub {
    private client_ID : string;
    private client_secret: string;
    user : string;
    private apiUrl : string;
    repos_count : number;
    repos_sort : string;
    constructor(username : string){
        this.client_ID = 'a48dc3b3b878bcec11af';
        this.client_secret = '344552f81a301a0bd316d26b7f23dafce8d7527c';
        this.user = username;
        this.apiUrl = "https://api.github.com/users/";
        this.repos_count = 5;
        this.repos_sort = 'created: asc';
    }

    async getUserData() : Promise<{profile : Object, repos : Array<Object>}>{
        let urlProfile : string = `${this.apiUrl}${this.user}?client_id=${this.client_ID}&client_secret=${this.client_secret}`;
        let urlRepos : string = `${this.apiUrl}${this.user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id=${this.client_ID}&client_secret=${this.client_secret}`;

        const responseProfile = await fetch(urlProfile);
        const responseRepos = await fetch(urlRepos);

        const profile = await responseProfile.json();
        const repos = await responseRepos.json();

        return {
            profile,
            repos
        };
    }
}