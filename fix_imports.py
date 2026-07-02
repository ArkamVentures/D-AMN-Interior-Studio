import os
import glob

def fix_imports():
    # First, let's reset to relative imports to make replacing easier
    # Or just replace the bad absolute imports I made earlier
    
    # We want to change:
    # `from database import` -> `from backend.database import`
    # `from config import` -> `from backend.config import`
    # `from routers import` -> `from backend.routers import`
    # `import models, schemas, auth` -> `from backend import models, schemas, auth`
    # `import auth, crud, models, schemas` -> `from backend import auth, crud, models, schemas`
    # `import crud, models, schemas, auth` -> `from backend import crud, models, schemas, auth`

    for py_file in glob.glob('backend/*.py') + glob.glob('backend/routers/*.py'):
        with open(py_file, 'r') as f:
            content = f.read()
            
        content = content.replace('from database import', 'from backend.database import')
        content = content.replace('from config import', 'from backend.config import')
        content = content.replace('from routers import', 'from backend.routers import')
        
        # In routers, we replaced `from .. import x` with `import x`.
        content = content.replace('import auth, crud, models, schemas', 'from backend import auth, crud, models, schemas')
        content = content.replace('import crud, models, schemas, auth', 'from backend import crud, models, schemas, auth')
        
        # In backend/auth.py, we had `import models, schemas`
        content = content.replace('import models, schemas\n', 'from backend import models, schemas\n')
        
        # In backend/crud.py, we had `import models, schemas, auth`
        content = content.replace('import models, schemas, auth\n', 'from backend import models, schemas, auth\n')
        
        with open(py_file, 'w') as f:
            f.write(content)

fix_imports()
print("Fixed imports to use backend.* namespace")
