import { Component, OnInit, Input } from '@angular/core';
import { Story } from '../stories/story.model';

@Component({
  selector: 'app-story-media',
  templateUrl: './story-media.component.html',
  styleUrls: ['./story-media.component.css']
})

export class StoryMediaComponent implements OnInit {

  constructor() { }
  @Input() story: Story;

  ngOnInit() {
    this.loadStoryMedia(this.story);
  }

  loadStoryMedia(story: Story) {
    console.log(`media files: ${story.title}`);
  }

}
