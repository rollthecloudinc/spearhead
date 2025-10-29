import { 
  Component, 
  OnInit, 
  EventEmitter, 
  Output, 
  PLATFORM_ID, 
  inject, 
  runInInjectionContext,
  EnvironmentInjector, // Import EnvironmentInjector for type safety
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AuthFacade } from '@rollthecloudinc/auth';
import { Router } from '@angular/router';
import { PublicApiBridgeService } from '@rollthecloudinc/bridge';

// IMPORTANT: Import the injector reference captured in your bootstrap file
// Make sure this path is correct relative to your app.component.ts location
import { ROOT_INJECTOR } from '../bootstrap'; 

declare var bridge: PublicApiBridgeService;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent implements OnInit {
  title = 'ipe';
  isAuthenticated: boolean = false;
  @Output()
  menuClicked = new EventEmitter();

  // Properties are declared but initialized to undefined, as they are assigned in ngOnInit
  private platformId: Object | undefined;
  private authFacade: AuthFacade | undefined;
  private router: Router | undefined;
  private publicApiBridge: PublicApiBridgeService | undefined;

  constructor() {
    // Constructor is kept minimal. No injection here to avoid NG0203.
  }

  // Helper method to safely perform injection
  private initializeDependencies(): void {
    const injector: EnvironmentInjector | null = ROOT_INJECTOR;

    if (!injector) {
        console.error("Injection failed: ROOT_INJECTOR is null. Check bootstrap.ts.");
        return; 
    }
    
    // 💥 FIX: Use runInInjectionContext to safely resolve dependencies.
    const injectedValues = runInInjectionContext(injector, () => {
        return {
            platformId: inject(PLATFORM_ID),
            authFacade: inject(AuthFacade),
            router: inject(Router),
            publicApiBridge: inject(PublicApiBridgeService)
        };
    });

    // Assign the resolved values
    this.platformId = injectedValues.platformId;
    this.authFacade = injectedValues.authFacade;
    this.router = injectedValues.router;
    this.publicApiBridge = injectedValues.publicApiBridge;
    
    // Set the global bridge service
    if (this.platformId && isPlatformBrowser(this.platformId)) {
      bridge = this.publicApiBridge as PublicApiBridgeService;
    }

    // Now that authFacade is defined, subscribe to the user stream
    this.authFacade.getUser$.subscribe(u => {
        this.isAuthenticated = !!u;
    });
  }

  ngOnInit() {
    // Initialize dependencies here, after the app is fully bootstrapped.
    this.initializeDependencies();
  }

  login() {
    // Add check as authFacade might be undefined if initialization failed
    if (this.authFacade) {
        this.authFacade.login();
    } else {
        console.error("Cannot login: AuthFacade is not initialized.");
    }
  }

  menuClick() {
    this.menuClicked.emit();
  }
}