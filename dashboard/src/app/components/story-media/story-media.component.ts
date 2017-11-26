import { Component, OnInit, Input } from '@angular/core';
import { Story, StoryMedia } from './../../models/story.model';
import { StoryMediaService } from '../../services/stories/story-media.service';

@Component({
  selector: 'app-story-media',
  templateUrl: './story-media.component.html',
  styleUrls: ['./story-media.component.css'],
  providers: [ StoryMediaService ]
})

export class StoryMediaComponent implements OnInit {

  constructor( private storyMediaService: StoryMediaService ) { }
  @Input() mediaFiles: StoryMedia;

  ngOnInit() { }

}
