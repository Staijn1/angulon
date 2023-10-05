import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { faBroom, faSave } from "@fortawesome/free-solid-svg-icons";
import { GeneralSettings, UserPreferences } from "../../shared/types/types";
import { themes } from "../../shared/constants";
import { Store } from "@ngrx/store";
import {
  ChangeGeneralSettings,
  SetDefaultUserPreferences
} from "../../../redux/user-preferences/user-preferences.action";
import { NgForm } from "@angular/forms";
import { debounceTime, skip } from "rxjs";

@Component({
  selector: "app-settings",
  templateUrl: "./settings-page.component.html",
  styleUrls: ["./settings-page.component.scss"]
})
export class SettingsPageComponent implements OnInit{
  @ViewChild("form", { static: true }) form!: NgForm;
  settings: GeneralSettings | undefined;
  saveIcon = faSave;
  themes = themes.map(theme => theme.name);
  selectedTheme = 0;
  clearSettingsIcon = faBroom;
  private skipFormUpdate = false;

  constructor(private readonly store: Store<{
    userPreferences: UserPreferences
  }>) {
    this.store.select("userPreferences").subscribe(preferences => {
      this.settings = structuredClone(preferences.settings);
      this.selectedTheme = this.themes.findIndex(theme => theme === preferences.settings.theme);
    });
  }

  ngOnInit(): void {
    // Skip the first value change because it's the initial value of the form
    this.form.form.valueChanges
      .pipe(debounceTime(50), skip(1))
      .subscribe(newValues => {
        this.skipFormUpdate = true;
        this.store.dispatch(new ChangeGeneralSettings(newValues));
      });
  }

  setTheme(theme: string): void {
    this.store.dispatch(new ChangeGeneralSettings({ theme: theme }));
  }

  clearSettings(): void {
    this.store.dispatch(new SetDefaultUserPreferences());
  }
}
