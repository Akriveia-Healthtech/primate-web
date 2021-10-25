import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/core/services/http/post/post.service';
import { UtilityService } from 'src/app/core/utility/utility.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css'],
})
export class SearchResultComponent implements OnInit {
  constructor(private post: PostService, private utility: UtilityService) {}
  menuState: boolean = false;
  toggleMenu() {
    this.menuState = this.menuState ? false : true;
    return this.menuState;
  }
  ngOnInit(): void {}
  results = [];
  searchText = '';
  search(search) {
    this.post.searchPosts(search).subscribe(
      (data) => {
        console.log(data);
        this.searchText = search;
        this.results = this.cleanResult(data['data']['posts']);
        console.log(this.results);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  cleanResult(list) {
    let newList = [];
    console.log(list);
    list.map((data, index) => {
      if (data.id != 'null') {
        console.log(data);
        let displayPost = {
          id: data.id,
          authorName: data['fields']['authorname'][0],
          createddate: this.utility.formatCreatedDate(data['fields']['createddate'], 'short', true, false),
          description: data['fields']['description'][0],
          title: data['fields']['title'][0],
          postLink: `https://${data['fields']['authorsubdomainprefix'][0]}.primate.health/${data.id}`,
          votes: data['fields']['votes'][0],
          img: data['fields']['img'] !== undefined ? data['fields']['img'][0] : false,
        };
        console.log(displayPost);
        newList.push(displayPost);
      }
    });
    console.log(newList);
    return newList;
  }
  // q = `https://107ef7pr84.execute-api.ap-south-1.amazonaws.com/dev/searchPosts?searchKey=Prajeet`;
}
