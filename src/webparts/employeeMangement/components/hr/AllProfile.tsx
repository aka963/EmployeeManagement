
import * as React from 'react';
import styles from '../EmployeeMangement.module.scss';
import { IEmployeeMangementProps } from '../IEmployeeMangementProps';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { DetailsList, IColumn, DetailsListLayoutMode, Selection, SelectionMode } from 'office-ui-fabric-react/lib/DetailsList';
import { ContextualMenu, ContextualMenuItemType, IContextualMenuProps, IContextualMenuItemProps } from 'office-ui-fabric-react/lib/ContextualMenu';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { mergeStyleSets, getTheme } from '@fluentui/react/lib/Styling';
import { Pagination } from '@pnp/spfx-controls-react/lib/Pagination';
import upOps from '../../../services/bal/UserProfileOps';

interface IAllProfileState {
  userProfile: any[];
  filteredProfiles: any[];
  pagedProfiles: any[];
  columns: IColumn[];
  searchText: string;
  selectionDetails: string;
  currentPage: number;
  pageSize: number;
  isSortedDescending: boolean;
  sortedColumn: string;
  menuTarget: HTMLElement | null;
  showContextMenu: boolean;
  contextMenuProfile: any | null;
}

export default class AllProfile extends React.Component<IEmployeeMangementProps, IAllProfileState> {
  private _selection: Selection;

  constructor(props: IEmployeeMangementProps) {
    super(props);

    const columns: IColumn[] = [
      this._createColumn('Title', 'ID', 70, 100),
      {
        key: 'EmployeeName',
        name: 'Name',
        fieldName: 'EmployeeName',
        minWidth: 100,
        maxWidth: 150,
        isResizable: true,
        onRender: (item: any) => (
          <span
            style={{ cursor: 'pointer', color: '#0078d4' }}
            onClick={(e) => this._showContextMenu(e, item)}
          >
            {item.EmployeeName}
          </span>
        )
      },
      this._createColumn('CurrentOfficeLocation.Title', 'Office', 100, 150, item => item.CurrentOfficeLocation?.Title || ''),
      this._createColumn('Designation.Title', 'Designation', 100, 150, item => item.Designation?.Title || ''),
      this._createColumn('MobileNo_x002e_', 'Mobile', 100, 120),
      this._createColumn('CompanyEmail', 'Email', 150, 200),
      this._createColumn('Scale.Title', 'Scale', 70, 100, item => item.Scale?.Title || ''),
      this._createColumn('Grade.Title', 'Grade', 70, 100, item => item.Grade?.Title || ''),
      this._createColumn('ReportingManager.Title', 'Reporting To', 120, 160, item => item.ReportingManager?.Title || ''),
    ];

    this._selection = new Selection({
      onSelectionChanged: () => {
        this.setState({ selectionDetails: this._getSelectionDetails() });
      }
    });

    this.state = {
      userProfile: [],
      filteredProfiles: [],
      pagedProfiles: [],
      columns,
      searchText: '',
      selectionDetails: this._getSelectionDetails(),
      currentPage: 1,
      pageSize: 10,
      isSortedDescending: false,
      sortedColumn: '',
      menuTarget: null,
      showContextMenu: false,
      contextMenuProfile: null
    };
  }

  public async componentDidMount(): Promise<void> {
    try {
      const profile = await upOps.getAllUserProfile(this.props);
      this.setState({
        userProfile: profile[0],
        filteredProfiles: profile[0],
      }, () => {
        this._updatePagedProfiles(1);
      });
    } catch (error) {
      console.error('Failed to load profiles', error);
    }
  }

  private _createColumn(key: string, name: string, minWidth: number, maxWidth: number, onRender?: (item: any) => any): IColumn {
    return {
      key,
      name,
      fieldName: key,
      minWidth,
      maxWidth,
      isResizable: true,
      onRender,
      isSorted: false,
      isSortedDescending: false,
      onColumnClick: (ev, col) => this._onColumnClick(ev, col),
    };
  }

  private _onColumnClick = (event: React.MouseEvent<HTMLElement>, column: IColumn): void => {
    const { filteredProfiles, isSortedDescending, sortedColumn } = this.state;
    const newIsSortedDescending = sortedColumn === column.key ? !isSortedDescending : false;

    const sortedItems = [...filteredProfiles].sort((a, b) => {
      const aVal = this._getValue(a, column.key);
      const bVal = this._getValue(b, column.key);

      return (aVal || '').toString().localeCompare((bVal || '').toString(), undefined, { sensitivity: 'base' }) *
        (newIsSortedDescending ? -1 : 1);
    });

    const updatedColumns = this.state.columns.map(col => {
      col.isSorted = col.key === column.key;
      col.isSortedDescending = col.key === column.key ? newIsSortedDescending : false;
      return col;
    });

    this.setState({
      filteredProfiles: sortedItems,
      columns: updatedColumns,
      isSortedDescending: newIsSortedDescending,
      sortedColumn: column.key
    }, () => {
      this._updatePagedProfiles(1);
    });
  };

  private _getValue(obj: any, path: string): any {
    return path.split('.').reduce((o, p) => (o ? o[p] : ''), obj);
  }

  private _getSelectionDetails(): string {
    const selectionCount = this._selection.getSelectedCount();
    if (selectionCount === 0) return 'No items selected';
    if (selectionCount === 1) return `1 item selected: ${(this._selection.getSelection()[0] as any).EmployeeName}`;
    return `${selectionCount} items selected`;
  }

  private _onItemInvoked(item: any): void {
    alert(`Item invoked: ${item.EmployeeName}`);
  }

  private _updatePagedProfiles(page: number): void {
    const { filteredProfiles, pageSize } = this.state;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    this.setState({
      currentPage: page,
      pagedProfiles: filteredProfiles.slice(start, end),
      showContextMenu: false
    });
  }

  private _onSearch = (_: any, newValue?: string): void => {
    const searchText = (newValue || '').toLowerCase();

    if (!searchText) {
      this.setState({ searchText: '', filteredProfiles: this.state.userProfile }, () => {
        this._updatePagedProfiles(1);
      });
      return;
    }

    const filtered = this.state.userProfile.filter(profile => {
      return Object.values(profile).some(value => {
        if (typeof value === 'string') {
          return value.toLowerCase().includes(searchText);
        }
        if (typeof value === 'object' && value !== null) {
          const nested = ['Title', 'Name', 'Email']
            .map(k => value[k])
            .filter(v => typeof v === 'string')
            .some(v => v.toLowerCase().includes(searchText));
          return nested;
        }
        return false;
      });
    });

    this.setState({ searchText: newValue, filteredProfiles: filtered }, () => {
      this._updatePagedProfiles(1);
    });
  };

  private _showContextMenu = (event: React.MouseEvent<HTMLElement>, profile: any): void => {
    event.preventDefault();
    this.setState({
      showContextMenu: true,
      menuTarget: event.currentTarget,
      contextMenuProfile: profile
    });
  };

  private _hideContextMenu = (): void => {
    this.setState({ showContextMenu: false, menuTarget: null, contextMenuProfile: null });
  };

  private _getMenuProps(): IContextualMenuProps {
    return {
      items: [
        {
          key: 'openInWord',
          text: 'Open in Word',
          iconProps: {},
          onRenderIcon: () => (
            <span className={classNames.iconContainer}>
              <Icon iconName="WordLogoFill16" className={classNames.logoFillIcon} />
              <Icon iconName="WordLogo16" className={classNames.logoIcon} />
            </span>
          )
        },
        { key: 'newItem', iconProps: { iconName: 'Add' }, text: 'New' },
        {
          key: 'upload',
          iconProps: { iconName: 'Upload', style: { color: 'salmon' } },
          text: 'Upload',
          onClick: () => alert("Upload clicked")
        },
        { key: 'divider_1', itemType: ContextualMenuItemType.Divider },
        { key: 'share', iconProps: { iconName: 'Share' }, text: 'Share' },
        { key: 'print', iconProps: { iconName: 'Print' }, text: 'Print' },
        { key: 'music', iconProps: { iconName: 'MusicInCollectionFill' }, text: 'Music' },
      ],
      onDismiss: this._hideContextMenu,
      target: this.state.menuTarget,
    };
  }

  public render(): React.ReactElement<IEmployeeMangementProps> {
    return (
      <div className={styles.employeeMangement}>
        <TextField placeholder="Search..." onChange={this._onSearch} value={this.state.searchText} />
        <DetailsList
          items={this.state.pagedProfiles}
          columns={this.state.columns}
          selectionMode={SelectionMode.single}
          selection={this._selection}
          layoutMode={DetailsListLayoutMode.justified}
          onItemInvoked={this._onItemInvoked}
        />
        <Pagination
          currentPage={this.state.currentPage}
          totalPages={Math.ceil(this.state.filteredProfiles.length / this.state.pageSize)}
          onChange={(page) => this._updatePagedProfiles(page)}
        />

        {this.state.showContextMenu && (
          <ContextualMenu {...this._getMenuProps()} />
        )}
      </div>
    );
  }
}

const theme = getTheme();
const classNames = mergeStyleSets({
  iconContainer: {
    position: 'relative',
    margin: '0 4px',
    height: 32,
    width: 14,
  },
  logoIcon: {
    position: 'absolute',
    left: 0,
    right: 0,
    color: theme.palette.themeDarkAlt,
  },
  logoFillIcon: {
    position: 'absolute',
    left: 0,
    right: 0,
    color: theme.palette.white,
  },
});
